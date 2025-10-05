// controllers/user.controller.js
import { z } from "zod";

const createUserInput = z.object({
    username: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(8),
});

const userIdParam = z.object({
    id: z.string().uuid(),
});


/** @param {{ create(input: any): Promise<any>, getById(id: string): Promise<any> }} userService */
export function makeUserController(userService) {
    return {
        create: async (req, res, next) => {
            try {
                // 1) Validate HTTP body at the edge
                const input = createUserInput.parse(req.body);

                // 2) Call service with plain data
                const user = await userService.create(input);

                // 3) Map domain result -> HTTP response
                res.status(201).json(user);
            } catch (err) { next(err); }
        },

        get: async (req, res, next) => {
            try {
                // 1) Validate route param
                const { id } = userIdParam.parse(req.params);

                // 2) Call service
                const user = await userService.getById(id);

                // 3) Shape HTTP response
                if (!user) return res.status(404).json({ message: "Not found" });
                res.json(user);
            } catch (err) { next(err); }
        },
    };
}
