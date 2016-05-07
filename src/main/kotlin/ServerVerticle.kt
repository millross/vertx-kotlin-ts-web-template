
import io.vertx.core.AbstractVerticle
import io.vertx.ext.web.Router.router
import io.vertx.ext.web.handler.StaticHandler

/**
 * @author Jeremy Prime
 * @since 1.0.0
 */
class ServerVerticle: AbstractVerticle() {

    override fun start() {
        val router = router(vertx)
        router.get("/").handler(StaticHandler.create("webapp"))
        val httpServer = vertx.createHttpServer()
        httpServer.requestHandler { req -> router.accept(req) }.listen(8080)
    }
}