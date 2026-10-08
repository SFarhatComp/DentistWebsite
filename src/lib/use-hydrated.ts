import { useSyncExternalStore } from "react"

const noop = () => () => {}

/** Vrai seulement après l'hydratation : permet d'améliorer un contenu déjà lisible sans script. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false)
}

/**
 * Paramètres de l'adresse, lus sans Suspense : le formulaire n'est jamais
 * remplacé pendant le chargement, donc la saisie n'est jamais effacée.
 */
export function useQuery(): URLSearchParams {
  const search = useSyncExternalStore(
    noop,
    () => window.location.search,
    () => "",
  )
  return new URLSearchParams(search)
}
