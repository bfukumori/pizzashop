import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  restaurantName: z.string().min(1, 'Campo obrigatório'),
  managerName: z.string().min(1, 'Campo obrigatório'),
  phone: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('Email inválido'),
})

type SignUpForm = z.infer<typeof schema>

export function SignUp() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: { email: string } }
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    defaultValues: {
      restaurantName: '',
      managerName: '',
      phone: '',
      email: state?.email ?? '',
    },
    resolver: zodResolver(schema),
  })

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp({
    restaurantName,
    managerName,
    phone,
    email,
  }: SignUpForm) {
    try {
      await registerRestaurantFn({
        restaurantName,
        managerName,
        phone,
        email,
      })
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => {
            navigate('/sign-in', {
              state: { email },
            })
          },
        },
      })
    } catch (error) {
      toast.error('Erro ao cadastrar restaurante')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register('restaurantName')}
              />
              {errors.restaurantName && (
                <p className="text-sm text-red-500">
                  {errors.restaurantName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
                {...register('managerName')}
              />
              {errors.managerName && (
                <p className="text-sm text-red-500">
                  {errors.managerName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a className="underline underline-offset-4" href="">
                termos de serviço
              </a>{' '}
              e{' '}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
