"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Siren, Ambulance } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("police");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "police") {
      router.push("/police-dashboard");
    } else {
      router.push("/medical-dashboard");
    }
  };

  return (
    <Tabs defaultValue="police" className="w-full max-w-md" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="police">
          <Siren className="w-4 h-4 mr-2" />
          Police
        </TabsTrigger>
        <TabsTrigger value="medical">
          <Ambulance className="w-4 h-4 mr-2" />
          Medical
        </TabsTrigger>
      </TabsList>
      <form onSubmit={handleLogin}>
        <TabsContent value="police">
          <Card>
            <CardHeader>
              <CardTitle>Police Login</CardTitle>
              <CardDescription>
                Select your service and proceed to the dashboard.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" type="submit">Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>Medical Services Login</CardTitle>
              <CardDescription>
                Select your service and proceed to the dashboard.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" type="submit">Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </form>
    </Tabs>
  );
}
