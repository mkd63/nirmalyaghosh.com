import {
  Box,
  Grid,
  Heading,
  HStack,
  Link as _Link,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import siteConfig from "config/site";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";
import { IoIosPaper, IoLogoGithub, IoMdEye } from "react-icons/io";
import IDoc from "types/doc";
import IFrontMatter from "types/frontMatter";

interface IProps {
  content: any;
  frontMatter: IFrontMatter;
  docs: any;
  slug: string;
  chapter: string;
}

const SocialShare = dynamic(
  import(/* webpackChunkName: "SocialShare" */ "components/social-share"),
  {
    ssr: false,
  }
);

const DocChapterPage: NextPage<IProps> = ({
  content,
  frontMatter,
  docs,
  slug,
  chapter,
}) => {
  const { colorMode } = useColorMode();
  const sectionBgColor = { light: "gray.100", dark: "black" };
  const sectionColor = { light: "black", dark: "gray.100" };

  const sidebarNode = () => {
    return (
      <Box>
        <VStack spacing={8} align="left" pos="sticky" top={8}>
          <HStack spacing={2} alignItems="center">
            <Box as={IoIosPaper} fontSize="xl" />
            <Heading as="h3" fontSize="xl">
              Documentation
            </Heading>
          </HStack>
          <VStack spacing={2} align="left">
            {docs.map((doc: IDoc, index: number) => {
              return (
                <Box key={doc.slug}>
                  <Link
                    href={{
                      pathname: "/docs/[slug]/[chapter]",
                      query: {
                        slug,
                        chapter: doc.slug,
                      },
                    }}
                  >
                    <a>
                      <Box
                        fontSize="sm"
                        fontWeight={doc.slug === chapter ? "bold" : "normal"}
                      >
                        {index + 1}. {doc.frontMatter.title}
                      </Box>
                    </a>
                  </Link>
                </Box>
              );
            })}
          </VStack>
        </VStack>
      </Box>
    );
  };

  const titleNode = (title: string) => {
    return (
      <Heading as="h1" size="xl">
        {title}
      </Heading>
    );
  };

  const githubButtonNode = () => {
    if (!frontMatter.githubLink) {
      return false;
    }

    return (
      <_Link
        py={2}
        px={4}
        href={frontMatter.githubLink}
        rounded="md"
        bg="#333"
        color="#fff"
        fontWeight="bold"
        isExternal
      >
        <HStack spacing={2} alignItems="center">
          <Box as={IoLogoGithub} />
          <Text>View source</Text>
        </HStack>
      </_Link>
    );
  };

  const demoButtonNode = () => {
    if (!frontMatter.demoLink) {
      return false;
    }

    return (
      <_Link
        py={2}
        px={4}
        href={frontMatter.demoLink}
        rounded="md"
        bg="#754abb"
        color="#fff"
        fontWeight="bold"
        isExternal
      >
        <HStack spacing={2} alignItems="center">
          <Box as={IoMdEye} /> <Text>View demo</Text>
        </HStack>
      </_Link>
    );
  };

  return (
    <>
      <NextSeo
        title={`${frontMatter.title} | ${siteConfig.details.title}`}
        description={frontMatter.description}
        openGraph={{
          url: `${siteConfig.details.url}`,
          title: siteConfig.details.title,
          description: frontMatter.description,
          images: [
            {
              url: frontMatter.coverImage
                ? frontMatter.coverImage
                : `${siteConfig.details.url}${siteConfig.assets.avatar}`,
              width: 800,
              height: 600,
              alt: frontMatter.title,
            },
          ],
          site_name: siteConfig.details.title,
          type: "article",
          locale: "en_IE",
        }}
      />
      <Box bg={sectionBgColor[colorMode]} color={sectionColor[colorMode]}>
        <Box maxW="6xl" mx="auto" px={4} py={8}>
          <Grid
            templateColumns={["1fr", "1fr", "1fr", "1fr 3fr"]}
            gridColumnGap={8}
            gridRowGap={8}
          >
            {sidebarNode()}
            <Box maxW="100%" overflowX="hidden">
              <VStack spacing={8} align="left">
                {titleNode(frontMatter.title)}
                <Box>
                  <Box d="flex" alignItems="center">
                    <HStack spacing={4}>
                      {githubButtonNode()}
                      {demoButtonNode()}
                    </HStack>
                  </Box>
                </Box>
                <Box className="article">{content}</Box>
                <Box>
                  <SocialShare title={frontMatter.title} />
                </Box>
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default DocChapterPage;
