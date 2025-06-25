# app.py

from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import TranscriptsDisabled, VideoUnavailable

app = Flask(__name__)  # Creates the Flask server

# Define a route at /transcript
@app.route("/transcript", methods=["GET"])
def get_transcript():

    video_id = request.args.get("videoId")  # Grab videoId from query string

    if not video_id:
        return jsonify({"error": "Missing videoId parameter"}), 400

    try:
        # Get the transcript list
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        # Combine all 'text' fields into a single string
        full_transcript = " ".join([entry["text"] for entry in transcript_list])
        # Return that instead of the full list
        return jsonify({"transcript": full_transcript}), 200
    except VideoUnavailable:
        return jsonify({"error": "Video unavailable"}), 404
    except TranscriptsDisabled:
        return jsonify({"error": "Transcripts are disabled for this video"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask server on port 5000
if __name__ == "__main__":
    app.run(port=5000)
