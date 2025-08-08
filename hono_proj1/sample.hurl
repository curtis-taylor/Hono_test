# GET https://jsonplaceholder.typicode.com/posts/1
GET http://localhost:5173/
HTTP 200

POST http://localhost:5173/video
{
  "videoName": "Spiderman",
  "channelName": "Netflix",
  "duration": "2 hr 30 min"

}
[Captures]
id: jsonpath "$['id']"

# DELETE http://localhost:5173/video/1634f174-b67d-4bd0-93b8-e02393406368

