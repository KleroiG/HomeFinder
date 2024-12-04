import server from "./server"
import colors from "colors"

const port = process.env.PORT || 4173
server.listen(port, () => {
  console.log(colors.cyan(`REST API EN EN PUERTO ${port}`))
})
