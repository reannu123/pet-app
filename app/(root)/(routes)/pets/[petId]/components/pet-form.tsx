"use client";
import { Image, Pet } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/heading";
import axios from "axios";
import { AlertModal } from "@/components/alert-modal";
import { Trash } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1),
  birthday: z.date().nullable(),
  description: z.string(),
  images: z.object({ imageUrl: z.string() }).array().min(1),
});

type PetFormValues = z.infer<typeof formSchema>;

interface PetFormProps {
  initialData:
    | (Pet & {
        images: Image[];
      })
    | null;
}

export default function PetForm({ initialData }: PetFormProps) {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Pet" : "Add Pet";
  const description = initialData
    ? "Edit your pet's details."
    : "Add a new pet to your family.";
  const toastMessage = initialData ? "Pet details updated!" : "Pet added!";
  const action = initialData ? "Save changes" : "Add pet";

  const form = useForm<PetFormValues>({
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : { name: "", birthday: null, description: "", images: [] },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: PetFormValues) => {
    setLoading(true);
    console.log(values);
    try {
      if (initialData) {
        await axios.patch(`/api/pets/${params.petId}`, values);
      } else {
        await axios.post("/api/pets", values);
      }
      router.push("/pets");
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      console.error("Failed to create product", error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/pets/${params.petId}`);
      router.push(`/pets`);
      router.refresh();
      toast.success("Pet deleted!");
    } catch (error: any) {
      toast.error(`Deletion error occured: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={title}
          description={description}
        />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.imageUrl)}
                    disabled={loading}
                    onChange={(imageUrl) =>
                      field.onChange([...field.value, { imageUrl }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter(
                          (current) => current.imageUrl !== url
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Pet name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={loading}
                      placeholder="Type a description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
          >
            {action}
          </Button>
        </form>
      </Form>
    </div>
  );
}
