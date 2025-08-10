import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { logger } from 'hono/logger'
import dbConnect from './db/connect'
import FavYoutubeVideosModel from './db/fav-youtube-models'
import { isValidElement } from 'hono/jsx'
import mongoose, { isValidObjectId } from 'mongoose'
import { stream, streamText, streamSSE } from 'hono/streaming';

const app = new Hono()

//middleware
app.use(poweredBy())
app.use(logger())

// app.use(renderer)

/*
dbConnect()
  .then(() => {
    // GET List
    app.get('/', async (c) => {
        
    })

    // Create document
    app.post('/', async (c) => {
     
    })

    // View document by ID
    app.get('/:documentId', async (c) => {
        const id = c.req.param("documentId")
        if (!isValidObjectId(id)) return c.json("Invalid ID", 400)

        const document = FavYoutubeVideosModel.findById(id);
        if(!document) return c.json("Document nout found", 404);

        return c.json(document, 200);

    })

    


  })
  .catch((err) => {
    app.get('/*', (c) => {
      return c.text(`Failed to connect mongodb ${err.message}`);
    })

}) */

dbConnect()
  .then(() => {
    // GET List
    app.get('/', async (c) => {
        const documents = await FavYoutubeVideosModel.find()
        return c.json(
          documents.map((d: { toObject: () => any }) => d.toObject()),
          200
        )
    })

    // Create document
    app.post('/', async (c) => {
      const formData = await c.req.json();
      if(!formData.thumbnailUrl) delete formData.thumbnailUrl

      const favYoutubeVideoObj =  new FavYoutubeVideosModel
      (formData)
      try {
        const document = await favYoutubeVideoObj.save()
        return c.json(document.toObject(), 201)
      } catch (error) {
          return c.json(
            (error as any)?.message || "Internal server error",
            500
          )
      }
    })

     // GET List
    app.get('/', async (c) => {
        
    })

    // Create document
    app.post('/', async (c) => {
     
    })

    // View document by ID
    app.get('/:documentId', async (c) => {
        const id = c.req.param("documentId")
        if (!isValidObjectId(id)) return c.json("Invalid ID", 400)

        const document = FavYoutubeVideosModel.findById(id);
        if(!document) return c.json("Document not found", 404);

        return c.json(document, 200); // toObject() not suggested in VSCODE compiler

    });

    app.get('/d/:documentId', async (c) => {

      const id = c.req.param("documentId")
        if (!isValidObjectId(id)) return c.json("Invalid ID", 400)

        const document = await FavYoutubeVideosModel.findById(id);
        if(!document) return c.json("Document nout found", 404);

        return streamText(c, async (stream) => {
          stream.onAbort(() => {
            console.log('Aborted!');
          })
          for(let i = 0; i < document.description.length; i++) {
            await stream.write(document.description[i])
            await stream.sleep(1000)
          }

        })
    })

    app.patch("/:documentId", async (c) => {
      const id = c.req.param("documentId")
      if (!isValidObjectId(id)) return c.json("Invalid ID", 400)

      const document = FavYoutubeVideosModel.findById(id);
      if(!document) return c.json("Document nout found", 404);

      const formData = await c.req.json()

      if(!formData.thumbnailUrl) delete formData.thumbnailUrl

      try {
        const updatedDocument = await FavYoutubeVideosModel.findByIdAndUpdate(
          id,
          formData,
          {
            new: true
          }
        )
        return c.json(updatedDocument?.toObject(), 200)
      } catch (error) {
          return c.json(
          (error as any)?.message || "Internal server error",
          500
          )
      }

    })

    app.delete('/:documentId', async (c) => {
      const id = c.req.param("documentId")
      if (!isValidObjectId(id)) return c.json("Invalid ID", 400)

      try {
        const deletedDocument = await FavYoutubeVideosModel.findByIdAndDelete(id)
        return c.json(deletedDocument?.toObject(), 200)
      } catch (error) {
        return c.json(
          (error as any)?.message || "Internal server error",
          500
          )
      }
    })

  })
  .catch((err) => {
    app.get('/*', (c) => {
      return c.text(`Failed to connect mongodb ${err.message}`);
    })

})

app.onError((err, c) => {
  return c.text(`App error: ${err.message}`)
})
export default app
