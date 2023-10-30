import React , { useState } from "react";
import { Progress, Space, Card  } from 'antd';

import { useGetEducationsQuery } from "../../redux/services/educationService";
import { useGetExperiencesQuery } from "../../redux/services/experienceServices";
import { useGetPortfoliosQuery } from "../../redux/services/portfolioService";
import { useGetUsersQuery } from "../../redux/services/userService";
import { useGetSkillsQuery } from "../../redux/services/skillService";

const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [pageExperience, setPageExperience] = useState(1);
  const [pagePortfolios, setPagePortfolios] = useState(1);
  const [pageUsers, setPageUsers] = useState(1);
  const [pageSkills, setPageSkills] = useState(1);

  const {data} = useGetEducationsQuery(page);
  const {data: dataExperience} = useGetExperiencesQuery(pageExperience);
  const {data: dataPortfolio} = useGetPortfoliosQuery(pagePortfolios);
  const {data: dataUser} = useGetUsersQuery(pageUsers);
  const {data: dataSkill} = useGetSkillsQuery(pageSkills);

  const twoColors = { '0%': '#108ee9', '100%': '#87d068' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
      <Space wrap>
        <Card title="Skill" bordered={false} style={{ width: 200 }}>
          <Progress type="circle" percent={dataSkill?.pagination.total} strokeColor={twoColors} />
        </Card>
        <Card title="User" bordered={false} style={{ width: 200 }}>
          <Progress type="circle" percent={dataUser?.pagination.total} strokeColor={twoColors} />
        </Card>
        <Card title="Portfolio" bordered={false} style={{ width: 200 }}>
          <Progress type="circle" percent={dataPortfolio?.pagination.total} strokeColor={twoColors} />
        </Card>
        <Card title="Education" bordered={false} style={{ width: 200 }}>
          <Progress type="circle" percent={data?.pagination.total} strokeColor={twoColors} />
        </Card>
        <Card title="Experience" bordered={false} style={{ width: 200 }}>
          <Progress type="circle" percent={dataExperience?.pagination.total} strokeColor={twoColors} />
        </Card>
      </Space>
  </div>
  )
}

export default DashboardPage