
'use client';

import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileProps {
  user: User;
}

interface UserProfile {
  displayName: string;
  bio: string;
  photoURL: string;
}

export default function Profile({ user }: ProfileProps) {
  const [profile, setProfile] = useState<UserProfile>({ displayName: '', bio: '', photoURL: '' });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data() as UserProfile);
      } else {
        // If no profile, use info from auth
        setProfile({
          displayName: user.displayName || '',
          bio: '',
          photoURL: user.photoURL || ''
        });
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    const docRef = doc(db, 'users', user.uid);
    try {
      await setDoc(docRef, profile, { merge: true });
      toast({
        title: "Profile Updated",
        description: "Your details have been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Update Failed",
        description: "Could not save your profile. Please try again.",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({...prev, [id]: value }));
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Profile</CardTitle>
        <CardDescription>View and edit your public profile details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={profile.photoURL} alt={profile.displayName} />
                <AvatarFallback>{profile.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-1">
                <Label htmlFor="photoURL">Avatar URL</Label>
                <Input id="photoURL" value={profile.photoURL} onChange={handleInputChange} placeholder="https://example.com/image.png"/>
            </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" value={profile.displayName} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email || ''} disabled />
        </div>
         <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Input id="bio" value={profile.bio} onChange={handleInputChange} placeholder={"Tell us a little about yourself"} />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardContent>
    </Card>
  );
}

function ProfileSkeleton() {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-20 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-10 w-32" />
            </CardContent>
        </Card>
    )
}
