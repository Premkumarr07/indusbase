/// <reference types="vite/types/importMeta.d.ts" />
import { createClient as createindusbaseClient } from '@indusbase/indusbase-js'

export function createClient() {
  return createindusbaseClient(
    import.meta.env.VITE_indusbase_URL!,
    import.meta.env.VITE_indusbase_PUBLISHABLE_KEY!
  )
}
