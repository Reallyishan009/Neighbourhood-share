import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import ItemDetails from "@/pages/ItemDetails";
import AddItem from "@/pages/AddItem";
import MyRequests from "@/pages/MyRequests";
import MapView from "@/pages/MapView";
import UserProfile from "@/pages/UserProfile";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items/:id" element={<ItemDetails />} />
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/my-requests" element={<MyRequests />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
