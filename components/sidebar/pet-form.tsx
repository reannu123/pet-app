import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PetForm() {
  const handleSubmit = (event: any) => {};
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add Pet</CardTitle>
        <CardDescription>Add new pet details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="pet-form"
          onSubmit={handleSubmit}
        >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your pet"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          form="pet-form"
          className="w-full"
        >
          Add
        </Button>
      </CardFooter>
    </Card>
  );
}
