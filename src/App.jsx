import { BrowserRouter, Routes, Route } from "react-router"
import Home from "./pages/Home"
import Posts from "./pages/Posts"
import About from "./pages/About"
import Layout from "./pages/Layout"
import PostDetail from "./pages/PostDetail"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
