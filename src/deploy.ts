import Github from 'github-api';
import { z } from 'zod';
import pathUtils from 'path';
import fs from 'fs/promises';

// e.g. bun ./src/deploy test Fairy-io bun-vue-trpc-dev <token> ./production/test_image_deployment.yaml image:0.0.1

const [name, owner, repo, token, path, image, template] =
    process.argv.slice(2);

const schema = z.object({
    name: z.string(),
    owner: z.string(),
    repo: z.string(),
    token: z.string(),
    path: z.string(),
    image: z.string(),
    template: z.string().optional(),
});

const result = schema.safeParse({
    name,
    owner,
    repo,
    token,
    path,
    image,
    template,
});

const deploy = async (data: z.infer<typeof schema>) => {
    const {
        name,
        owner,
        repo,
        token,
        path,
        image,
        template = './src/deployment.template.yaml',
    } = data;

    const templatePath = pathUtils.join(
        process.cwd(),
        template,
    );

    const templateContent = (
        await fs.readFile(templatePath)
    ).toString();

    const deployment = templateContent
        .replace(/<name>/g, name)
        .replace(/<image>/g, image);

    await new Promise<void>((resolve) => {
        new Github({ token })
            .getRepo(owner, repo)
            .writeFile(
                'main',
                path,
                deployment,
                `creating deployment: ${name}, for image: ${image}`,
                {},
                async () => {
                    console.log(
                        `deployment: ${name}, for image: ${image} created`,
                    );
                    resolve();
                },
            );
    });
};

if (!result.success) {
    throw result.error;
} else {
    deploy(result.data);
}
