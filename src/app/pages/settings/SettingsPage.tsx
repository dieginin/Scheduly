import { BackButton, Title } from "@/app/components"
import { PersonalCard, PreferencesCard, SecurityCard } from "./ui"

import { Settings } from "lucide-react"

export const SettingsPage = () => {
  return (
    <div className='py-5.5'>
      <BackButton />

      <div className='grid gap-5 w-sm md:w-2xl'>
        <Title title='Settings' icon={Settings} />

        <div className='grid gap-4 px-2 md:grid-cols-2'>
          <PersonalCard />

          <SecurityCard />

          <PreferencesCard />
        </div>
      </div>
    </div>
  )
}
