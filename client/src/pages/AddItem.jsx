import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { addItem } from "@/api/items";

const categories = [
  "Tools",
  "Kitchen",
  "Outdoors",
  "Fitness",
  "Games",
  "Electronics",
  "Books",
  "Other"
];
const conditions = ["Like New", "Excellent", "Very Good", "Good", "Fair"];

const AddItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    condition: "",
    image: ""
  });

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const validateForm = () => {
    const { name, description, category, condition } = formData;
    if (!name || !description || !category || !condition) {
      toast.error("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      await addItem(formData);
      toast.success("Item added!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
          <CardDescription>
            Share an item with your neighborhood
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label>Name *</label>
              <Input
                value={formData.name}
                onChange={handleChange("name")}
                placeholder="Cordless Drill"
              />
            </div>

            <div className="space-y-1">
              <label>Description *</label>
              <Textarea
                value={formData.description}
                onChange={handleChange("description")}
                placeholder="18 V cordless drill, lightly used…"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label>Category *</label>
                <Select
                  value={formData.category}
                  onValueChange={(val) =>
                    setFormData((p) => ({ ...p, category: val }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 space-y-1">
                <label>Condition *</label>
                <Select
                  value={formData.condition}
                  onValueChange={(val) =>
                    setFormData((p) => ({ ...p, condition: val }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <label>Image URL (optional)</label>
              <Input
                value={formData.image}
                onChange={handleChange("image")}
                placeholder="https://…"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting…" : "Add Item"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddItem;
