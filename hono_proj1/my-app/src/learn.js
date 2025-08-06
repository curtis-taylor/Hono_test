import { Hono } from "hono";
import { v4 as uuidv4 } from "uuid";
import { Hono } from 'hono';
import { stream, streamText, streamSSE } from 'hono/streaming';

let videos = [];

const app = new Hono();

app.get('/', (c) => {
    return c.html('<h1>WELCOME C</h1>');
});

app.post('/video', async(c) => {
    const {videoName, channelName, duration} = await c.req.json()
    const newVideo = {
        id: uuidv4(),
        videoName,
        channelName,
        duration
    }
    videos.push(newVideo);
    console.log(videos);
    return c.json(newVideo);
});

// READ ALL using stream

app.get('/videos', (c) => {
    
    return streamText(c, async(stream) => {
        for(const video of videos){
            await stream.writeln(JSON.stringify(video));
            await stream.sleep(2000);
        }
    });
});

app.get('/video/:id', (c) => {

});

export default app;
