// services/user.service.js
import bcrypt from "bcryptjs";
import { User } from "../models/user.entity.js";

/** Fake repo as placeholder. Replace with real implementation when DB is chosen
 * @param {Object} deps
 * @param {UserRepository} deps.repo
 * @param {{ newId(): string } | null} deps.idGen
 */
export function makeUserService({ repo, idGen }) {
  return {
    /** @param {{username: string; email: string; password: string}} input */
    async create(input) {
      const passwordHash = await bcrypt.hash(input.password, 12);

      // Decide who sets the ID:
      const id = idGen ? idGen.newId() : undefined;

      const entity = new User({
        id, // undefined means "repo/DB will assign the id"
        username: input.username,
        email: input.email,
        passwordHash,
      });

      const saved = await repo.create(entity);

      // Don’t leak secrets
      const { passwordHash: _, ...safe } = saved;
      return safe;
    },

    async getById(id) {
      const user = await repo.findById(id);
      if (!user) return null;
      const { passwordHash: _, ...safe } = user;
      return safe;
    },
  };
}
