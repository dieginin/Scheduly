interface Props {
  subtitle: string
  title: string
  withoutLogo?: boolean
}

export const Title = ({ subtitle, title, withoutLogo = false }: Props) => {
  return (
    <>
      {!withoutLogo && <img className='w-35 h-35 mx-auto' src='/images/logo.svg' alt='Scheduly Logo' />}
      <h1 className='text-4xl text-foreground font-semibold text-center'>{title}</h1>
      <p className='text-xl font-thin text-center text-muted-foreground'>{subtitle}</p>
    </>
  )
}
