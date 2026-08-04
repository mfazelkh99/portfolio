export function getActiveProject(
    progress: number,
    totalProjects: number
) {
    const index = Math.floor(progress * totalProjects);

    return Math.min(index, totalProjects - 1);
}