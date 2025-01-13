'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function login(formData) {

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/view/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {


  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }


  if (error) {
    redirect('/view/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}