import { MetaTags } from "@/components/meta";
import { API_URL } from "@/constants";
import { useUser } from "@/context/user";
import { outfit } from "@/fonts";
import useHydrateUserState from "@/hook/userHydrateUserState";
import { Button, Container, Group, Paper, SimpleGrid, Text, Title } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useRef } from "react";

function Dashboard() {
    useHydrateUserState();
    const { data, hasNextPage, fetchNextPage, refetch, isFetching, error } =
        useInfiniteQuery<{
            patients: {
                id: string;
                bloodGroup: string;
                component: string;
                currentHealthStatus: string;
                requiredOn: Date;
                patient: {
                    user: {
                        phone: string;
                        email: string;
                    };
                };
            }[];
            next?: number;
        }>({
            queryKey: ["patients"],
            queryFn: async ({ pageParam = 10 }) => {
                return await (
                    await fetch(`${API_URL}/dashboard?take=${pageParam}`)
                ).json();
            },
            getNextPageParam: (lastPage, _) => lastPage?.next,
        });

    const ref = useRef<HTMLDivElement>(null);
    const { entry, ref: intersectionRef } = useIntersection({
        root: ref.current,
        threshold: 0.5,
    });
    const user = useUser(d => d.user)
    useEffect(() => {
        if (entry?.isIntersecting) {
            if (hasNextPage) fetchNextPage();
            else refetch();
        }
    }, [entry?.isIntersecting]);
    const { asPath, replace } = useRouter()

    useEffect(() => {
        if (!user.id) {
            replace({
                pathname: "/",
                query: {
                    to: asPath
                }
            })
        }
    }, [user.id])


    return (
        <Container ref={ref}>
            <MetaTags
                description="View Patients needing blood donation"
                title="Dashboard"
            />
            {data?.pages?.[0].patients?.length === 0 && (
                <Title align="center" order={1} className={outfit.className}>
                    No patients found
                </Title>
            )}
            {data?.pages.map((data, i) => (
                <Fragment key={i}>
                    <SimpleGrid
                        breakpoints={[
                            { minWidth: "sm", cols: 2 },
                            { minWidth: "md", cols: 2 },
                            { minWidth: 1200, cols: 3 },
                        ]}
                    >
                        {data.patients?.map((patient) => (
                            <Paper
                                key={patient.id}
                                shadow="md"
                                radius={"md"}
                                p="md"
                                withBorder
                                component={Link}
                                href={`/patient/${patient.id}`}
                            >
                                <Title order={3} className={outfit.className}>
                                    Blood Group:
                                    <span className="pl-2">
                                        {patient.bloodGroup}
                                    </span>
                                </Title>
                                <Text className={outfit.className}>
                                    Component:
                                    <span className="pl-2">
                                        {patient.component}
                                    </span>
                                </Text>
                                <Text className={outfit.className}>
                                    Current Health Status:
                                    <span className="pl-2" >
                                        {patient.currentHealthStatus}
                                    </span>
                                </Text>
                                <Text className={outfit.className}>
                                    Required On:{" "}
                                    <span className="pl-2">

                                        {new Date(patient.requiredOn).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </Text>
                            </Paper>
                        ))}
                    </SimpleGrid>
                </Fragment>
            ))}
            {
                hasNextPage ? <Group position="center">
                    <Button variant="outline" onClick={() => fetchNextPage()} >
                        Load More
                    </Button>
                </Group>
                    : null
            }
            <div ref={intersectionRef} />
        </Container>
    );
}

export default Dashboard;
