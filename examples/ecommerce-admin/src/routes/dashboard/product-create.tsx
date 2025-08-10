import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateOne } from "@structura/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/features/products/types";
import { Link } from "react-router";
import { toast } from "sonner";

export function ProductCreatePage() {
  const { mutate } = useCreateOne<{ id: number }, Omit<Product, "id">>({
    mutationOptions: {
      onSuccess: () => {
        toast.success("Succesfully created Product");
      },
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      price: 0.0,
      description: "",
      category: "",
      image: "",
    },
    onSubmit: async ({ value }) => {
      await mutate(value);
    },
  });

  return (
    <div className="mx-auto w-full max-w-2xl py-10">
      <Card className="border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <form.Field
              name="title"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Title</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter product title"
                  />
                </div>
              )}
            />

            <form.Field
              name="price"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Price</Label>
                  <Input
                    id={field.name}
                    type="number"
                    step="0.01"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseFloat(e.target.value) || 0)
                    }
                    placeholder="Enter price in USD"
                  />
                </div>
              )}
            />

            <form.Field
              name="description"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Description</Label>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Detailed description of the product"
                    className="min-h-[100px]"
                  />
                </div>
              )}
            />

            <form.Field
              name="category"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Category</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter category name"
                  />
                </div>
              )}
            />

            <form.Field
              name="image"
              children={(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Image URL</Label>
                  <Input
                    id={field.name}
                    type="url"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" asChild>
                <Link to="../products">Go Back</Link>
              </Button>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]: [boolean, boolean]) => (
                  <Button type="submit" disabled={!canSubmit} className="px-6">
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                )}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
