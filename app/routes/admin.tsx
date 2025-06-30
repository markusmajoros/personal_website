"use no memo"

import type {MetaFunction} from 'react-router'
import { Studio } from 'sanity'
import { Hydrated } from '~/components/hydrated'

import config from '../../sanity.config'

export const meta: MetaFunction = () => [
  {title: 'Sanity Studio'},
  {name: 'robots', content: 'noindex'},
]

export default function StudioPage() {
  return (
    <Hydrated>
      <Studio config={config} />
    </Hydrated>
  )
}