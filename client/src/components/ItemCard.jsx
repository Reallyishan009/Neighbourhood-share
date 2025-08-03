import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function ItemCard({ item, viewMode, onRequest }) {
  return (
    <Card
      className={
        viewMode === "list"
          ? "flex flex-row h-full min-h-[220px]"
          : "flex flex-col h-full min-h-[420px]"
      }
    >
      <div
        className={
          viewMode === "list"
            ? "w-48 h-full flex-shrink-0"
            : "w-full aspect-video"
        }
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          overflow: "hidden",
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover align-top"
          style={{ display: "block" }}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop";
          }}
        />
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 justify-between">
        <div
          className={
            viewMode === "list" ? "flex-1 p-6 pb-2" : "flex-1 p-6 pb-2"
          }
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
              <CardDescription className="mt-1 mb-2">
                {item.description}
              </CardDescription>
            </div>
            <div className="ml-2 mt-1">
              <Badge variant={item.available ? "default" : "secondary"}>
                {item.available ? "Available" : "Borrowed"}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="outline">{item.category}</Badge>
            <Badge variant="outline">{item.condition}</Badge>
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="" />
              <AvatarFallback className="text-xs">
                {item.owner
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{item.owner}</span>
          </div>

          {!item.available && item.borrowedBy && (
            <p className="text-sm text-muted-foreground mb-2">
              Borrowed by: {item.borrowedBy}
            </p>
          )}
        </div>

        <CardFooter className="flex space-x-2 w-full mt-auto p-4 pt-0">
          <Button asChild className="flex-1">
            <Link to={`/items/${item.id}`}>View Details</Link>
          </Button>
          {item.available && (
            <Button onClick={() => onRequest(item.id)} variant="outline">
              Request
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
