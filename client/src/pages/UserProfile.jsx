// client/src/pages/UserProfile.jsx
import { useState, useEffect } from "react";
import { Mail, MapPin, Calendar, Star, TrendingUp, Package } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getTrustScore } from "@/api/items";

/**
 * Simple avatar component (no external lib required)
 */
const Avatar = ({ name, src }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative w-24 h-24 rounded-full bg-muted overflow-hidden mx-auto">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="flex items-center justify-center w-full h-full text-3xl font-bold">
          {initials}
        </span>
      )}
    </div>
  );
};

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getTrustScore("usr123"); // mock user id
      setProfile(data);
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ───────────── loading / error UI ───────────── */
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <p>Could not load profile.</p>
        <Button onClick={fetchProfile}>Retry</Button>
      </div>
    );
  }

  /* ───────────── main UI ───────────── */
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left column – identity */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center space-y-3">
            <Avatar name={profile.name} src="" />
            <CardTitle>{profile.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined {profile.joinDate}</span>
            </div>

            <Button variant="outline" className="w-full">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* Right column – stats */}
        <div className="space-y-6 md:col-span-2">
          {/* Trust score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Trust Score
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-green-600">
                  {profile.trustScore}/10
                </div>
                <p className="text-sm text-muted-foreground">
                  {profile.positiveFeedback}% positive feedback
                </p>
              </div>
              <Badge variant="success" className="text-base px-4 py-2">
                Excellent
              </Badge>
            </CardContent>
          </Card>

          {/* Activity cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{profile.lendingCount}</p>
                  <p className="text-sm text-muted-foreground">Items Lent</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <Package className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{profile.borrowingCount}</p>
                  <p className="text-sm text-muted-foreground">Items Borrowed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
