"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userSettingsSchema } from "@/lib/validations/user-settings"
import { buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserSettingsFormProps {
  user: User
  userProvider: string
}

type FormData = z.infer<typeof userSettingsSchema>

export function UserSettingsForm({
  user,
  userProvider,
}: UserSettingsFormProps) {
  const { update } = useSession()
  const router = useRouter()
  const form = useForm<FormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      name: user?.name || "",
      receiveMarketingEmails: user.receiveMarketingEmails,
      receiveSecurityEmails: user.receiveSecurityEmails,
    },
  })
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [isSendingEmail, setIsSendingEmail] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        receiveMarketingEmails: data.receiveMarketingEmails,
        receiveSecurityEmails: data.receiveSecurityEmails,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your settings were not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your settings have been updated.",
    })

    await update({ name: data.name })

    window.location.reload()
  }

  async function verifyEmail() {
    setIsSendingEmail(true)

    const response = await fetch(`/api/email/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: user.email,
      }),
    })

    setIsSendingEmail(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Email could not be sent. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: `Verification email successfully sent to ${user.email}.`,
    })

    router.refresh()
  }

  const getProviderIcon = () => {
    switch (userProvider) {
      case "google":
        return <Icons.google className="h-4 w-4" />
      default:
        return <Icons.mail className="h-4 w-4" />
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-9">
        <div>
          <h3 className="mb-4 text-lg font-medium">Profile</h3>
          <div className="flex flex-col gap-2 space-y-4 rounded-lg border p-4">
            <FormItem>
              <FormLabel className="text-base">Account provider</FormLabel>
              <div className="flex flex-row items-center gap-2 text-sm capitalize text-blue-700">
                {getProviderIcon()}
                {userProvider}
              </div>
              <FormDescription>
                The provider you used to create your account.
              </FormDescription>
            </FormItem>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      className="w-auto md:w-[400px]"
                      size={32}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  {form.formState.errors?.name && (
                    <p className="text-xs text-red-600">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                  <FormDescription>
                    Please enter your full name or a display name you are
                    comfortable with.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className="flex flex-row items-center gap-2 text-base">
                Email{" "}
                {user.emailVerified ? (
                  <Icons.check className="h-4 w-4 text-blue-700" />
                ) : (
                  <button
                    type="submit"
                    className={cn(
                      buttonVariants({ variant: "link", size: "sm" }),
                      "text-blue-700"
                    )}
                    onClick={verifyEmail}
                    disabled={isSendingEmail}
                  >
                    {isSendingEmail && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    <span>Verify</span>
                  </button>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  disabled
                  id="email"
                  className="w-auto md:w-[400px]"
                  size={32}
                  value={user.email || ""}
                />
              </FormControl>
              <FormDescription>
                The email address you used to create your account.
              </FormDescription>
            </FormItem>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="receiveMarketingEmails"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-between rounded-lg border p-4 md:flex-row md:items-center">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Marketing emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about new products, features, and more.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiveSecurityEmails"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start justify-between rounded-lg border p-4 md:flex-row md:items-center">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Security emails</FormLabel>
                    <FormDescription>
                      Receive emails about your account security.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className={cn(buttonVariants({ variant: "default" }))}
          disabled={isSaving || !form.formState.isDirty}
        >
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Save</span>
        </button>
      </form>
    </Form>
  )
}
