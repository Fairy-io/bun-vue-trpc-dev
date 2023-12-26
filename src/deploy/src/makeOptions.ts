import { z } from 'zod';

const schema = z.object({
    name: z.string(),
    owner: z.string(),
    repo: z.string(),
    token: z.string(),
    path: z.string(),
    image: z.string(),
    template: z.string().optional(),
});

export const makeOptions = (
    args: string[],
): z.infer<typeof schema> => {
    const obj: { [key: string]: string } = {};
    args.map((arg) => arg.trim()).forEach((arg) => {
        let [key, value] = arg.split('=');
        key = key.trim();
        if (value) {
            value = value.trim();
        }

        obj[key] = value;
    });

    const result = schema.safeParse(obj);

    if (result.success) {
        return result.data;
    }

    const errors: string[] = [''];

    const { name, owner, repo, token, path, image } =
        result.error.format();

    if (name && name._errors.includes('Required')) {
        errors.push('name option is required');
    }

    if (owner && owner._errors.includes('Required')) {
        errors.push('owner option is required');
    }

    if (repo && repo._errors.includes('Required')) {
        errors.push('repo option is required');
    }

    if (token && token._errors.includes('Required')) {
        errors.push('token option is required');
    }

    if (path && path._errors.includes('Required')) {
        errors.push('path option is required');
    }

    if (image && image._errors.includes('Required')) {
        errors.push('image option is required');
    }

    throw new Error(errors.join('\n'));
};
