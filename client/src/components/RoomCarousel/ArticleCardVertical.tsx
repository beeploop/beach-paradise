import { Avatar, Card, createStyles, Group, Text } from '@mantine/core';
import { CarouselCard } from './CardCarousel';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
        fontWeight: 700,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        lineHeight: 1.2,
    },

    body: {
        padding: theme.spacing.md,
    },
}));

interface ArticleCardVerticalProps {
    image: string;
    category: string;
    title: string;
    date: string;
    author: {
        name: string;
        avatar: string;
    };
}

export function ArticleCardVertical({
    category,
    title,
    date,
    author,
}: ArticleCardVerticalProps) {
    const { classes } = useStyles();

    return (
        <Card
            withBorder
            radius="md"
            p={0}
            className={classes.card}
        >
            <Group
                noWrap
                spacing={0}
            >
                <CarouselCard />
                <div className={classes.body}>
                    <Text
                        transform="uppercase"
                        color="dimmed"
                        weight={700}
                        size="xs"
                    >
                        {category}
                    </Text>
                    <Text
                        className={classes.title}
                        mt="xs"
                        mb="md"
                    >
                        {title}
                    </Text>
                    <Group
                        noWrap
                        spacing="xs"
                    >
                        <Group
                            spacing="xs"
                            noWrap
                        >
                            <Avatar
                                size={20}
                                src={author.avatar}
                            />
                            <Text size="xs">{author.name}</Text>
                        </Group>
                        <Text
                            size="xs"
                            color="dimmed"
                        >
                            •
                        </Text>
                        <Text
                            size="xs"
                            color="dimmed"
                        >
                            {date}
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    );
}
