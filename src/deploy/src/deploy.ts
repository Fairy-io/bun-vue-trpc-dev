import Github from 'github-api';
import fs from 'fs/promises';
import pathUtils from 'path';
import { makeOptions } from './makeOptions';

export const deploy = async (
    Github: new (auth: { token: string }) => Github,
    args: string[],
) => {
    const {
        name,
        owner,
        repo,
        token,
        path,
        image,
        template,
    } = makeOptions(args);

    const templatePath = pathUtils.join(
        import.meta.dir,
        'deployment.template.yaml',
    );

    const templateContent = template
        ? Buffer.from(template, 'base64').toString()
        : (await fs.readFile(templatePath)).toString();

    const content = templateContent
        .replace(/\$name/g, name)
        .replace(/\$image/g, image);

    const github = new Github({ token });
    const repository = github.getRepo(owner, repo);

    await new Promise<void>((resolve) => {
        repository.writeFile(
            'main',
            path,
            content,
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
