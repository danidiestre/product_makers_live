'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { User, Role } from '@prisma/client'
import { updateProfile } from '@/app/dashboard/profile/actions'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface ProfileFormProps {
  initialData: User
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const { data: session, update } = useSession()

  // Form state
  const [isLoading, setIsLoading] = useState(false)

  // Cast initialData to include the profile fields we know exist
  const typedInitialData = initialData as User & {
    bio: string | null
    twitter: string | null
    github: string | null
    linkedin: string | null
    website: string | null
  }

  const [formData, setFormData] = useState({
    name: typedInitialData.name || '',
    bio: typedInitialData.bio || '',
    role: (typedInitialData.role || '') as Role | '',
    twitter: typedInitialData.twitter || '',
    github: typedInitialData.github || '',
    linkedin: typedInitialData.linkedin || '',
    website: typedInitialData.website || ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({ ...prev, role: value as Role | '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await updateProfile(formData)

      if (!result.success) {
        throw new Error(result.error)
      }

      // Update the session with new data
      await update({
        ...session,
        user: {
          ...session?.user,
          ...result.user
        }
      })

      // Use sonner toast for success
      toast.success('Perfil actualizado correctamente')
    } catch (error: any) {
      console.error('Error al actualizar el perfil:', error)
      // Use sonner toast for error
      toast.error(error.message || 'No se ha podido actualizar el perfil')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-6">

      <form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Información personal</CardTitle>
              <CardDescription>
                Tu perfil en la comunidad de product makers
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <Avatar className="size-24">
                  <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || 'User'} />
                  <AvatarFallback className="text-xl">
                    {session?.user?.name?.charAt(0) || '?'}
                  </AvatarFallback>
                </Avatar>

                <div className="w-full flex flex-col gap-6">

                  <div className="w-full flex flex-col md:flex-row gap-6">
                    <div className="w-full flex flex-col gap-3">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-3">
                      <Label htmlFor="role">Rol</Label>
                      <Select
                        value={formData.role}
                        onValueChange={handleRoleChange}
                      >
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Developer">Developer</SelectItem>
                          <SelectItem value="Designer">Designer</SelectItem>
                          <SelectItem value="ProductManager">Product Manager</SelectItem>
                          <SelectItem value="Marketer">Marketer</SelectItem>
                          <SelectItem value="Founder">Founder</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <Label htmlFor="bio">Biografía</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3 pb-6">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </CardFooter>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Redes sociales</CardTitle>
              <CardDescription>
                Conecta con otros makers
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-6">

              <div className="w-full flex flex-col gap-3">
                <Label htmlFor="website">Web</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="Tu web personal o de tu proyecto"
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <Label htmlFor="linkedin">Linkedin</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="Tu usuario de linkedin"
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="Tu usuario de Twitter sin la @"
                />
              </div>

              <div className="w-full flex flex-col gap-3">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="Tu usuario de GitHub"
                />
              </div>

            </CardContent>
            <CardFooter className="flex justify-end gap-3 pb-6">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar cambios'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form >
    </div >
  )
} 