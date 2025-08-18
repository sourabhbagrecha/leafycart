import styled from "styled-components";

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

export function PageWrapper({ title, children }: PageWrapperProps) {
  return (
    <PageContainer>
      <PageTitle>{title}</PageTitle>
      {children}
    </PageContainer>
  );
}
