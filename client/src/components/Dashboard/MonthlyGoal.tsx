import { Text, Progress, Card, createStyles } from '@mantine/core'

const useStyles = createStyles((theme) => ({
    card: {
        // marginBlock: theme.spacing.xl * 2,
        backgroundColor: theme.fn.primaryColor(),
        width: '100%',
    },

    title: {
        color: theme.fn.rgba(theme.white, 0.65),
    },

    stats: {
        color: theme.white,
    },

    progressBar: {
        backgroundColor: theme.white,
    },

    progressTrack: {
        backgroundColor: theme.fn.rgba(theme.white, 0.4),
    },
}))

export function MonthlyGoal({ income }: any) {
    const { classes } = useStyles()
    return (
        <Card withBorder radius="md" p="xl" className={classes.card}>
            <Text
                size="xs"
                transform="uppercase"
                weight={700}
                className={classes.title}
            >
                Monthly goal
            </Text>
            <Text size="lg" weight={500} className={classes.stats}>
                ₱{income.toLocaleString()} / ₱100,000
            </Text>
            <Progress
                value={income / 1000}
                mt="md"
                size="lg"
                radius="xl"
                classNames={{
                    root: classes.progressTrack,
                    bar: classes.progressBar,
                }}
            />
        </Card>
    )
}
