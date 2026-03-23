import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home.tsx";
import NotFound from "./containers/NotFound.tsx";
import Login from "./containers/Login.tsx";
import Signup from "./containers/Signup.tsx";
import NewNote from "./containers/NewNote.tsx";
import AuthenticatedRoute from "./components/AuthenticatedRoute.tsx";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute.tsx";
import Notes from "./containers/Notes.tsx";

<Route path="*" element={<NotFound />} />;
export default function Links() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* Finally, catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />;
            <Route path="/login" element={<UnauthenticatedRoute><Login /></UnauthenticatedRoute>} />
            <Route path="/signup" element={<UnauthenticatedRoute><Signup /></UnauthenticatedRoute>} />
            <Route path="/notes/new" element={<AuthenticatedRoute><NewNote /></AuthenticatedRoute>} />
            <Route path="/notes/:id" element={<AuthenticatedRoute><Notes /></AuthenticatedRoute>} />
        </Routes>

    );
}