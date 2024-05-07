import { createRoot } from "react-dom/client";
import { router } from "./routes/routes"

import { RouterProvider } from "react-router-dom";
import "./styles.scss"

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

console.log("🚀 ~ router:", router)
root.render(
    <RouterProvider router={router} />
);