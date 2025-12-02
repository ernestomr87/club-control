export const getLevelColor = (level: string) => {
    switch (level) {
        case 'Beginner':
            return '#FFCDD2';
        case 'Intermediate':
            return '#ECEFF1';
        case 'Advanced':
            return '#DCE7DE';
        default:
            return '#F5F5F5';
    }
}