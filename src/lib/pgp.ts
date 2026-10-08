import fs from "fs"
import path from "path"

/**
 * Le formulaire d'urgence chiffré n'est offert que si la clé publique du studio
 * est en place (public/pgp/studio.asc). Évalué au build.
 */
export function hasStudioKey(): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "pgp", "studio.asc"))
}
