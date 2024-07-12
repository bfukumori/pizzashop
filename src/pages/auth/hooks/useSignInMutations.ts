import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'

const schema = z.object({
  email: z.string().email('E-mail inválido'),
})

type SignInForm = z.infer<typeof schema>

export function useSignInMutations() {
  const { state } = useLocation() as { state: { email: string } }
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    defaultValues: {
      email: state?.email ?? '',
    },
    resolver: zodResolver(schema),
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn({ email }: SignInForm) {
    try {
      await authenticate({ email })
      toast.success('Enviamos um link de acesso para seu e-mail.', {
        action: {
          label: 'Reenviar',
          onClick: () => {
            handleSignIn({ email })
          },
        },
      })
    } catch (error) {
      toast.error('Credenciais inválidas.')
    }
  }

  return {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    handleSignIn,
    state,
    setValue,
  }
}
