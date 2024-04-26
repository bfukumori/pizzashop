import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'

const schema = z.object({
  restaurantName: z.string().min(1, 'Campo obrigatório'),
  managerName: z.string().min(1, 'Campo obrigatório'),
  phone: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('Email inválido'),
})

type SignUpForm = z.infer<typeof schema>

export function useSignUpMutations() {
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

  return {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    handleSignUp,
  }
}
