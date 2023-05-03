import React, { useEffect, useState } from 'react';
import { Card, Col, Collapse, Divider, Row, Tooltip } from 'antd';
import colors from '@/models/colors';
import { ColProps } from 'antd/lib/col';
import { IProject } from '@/pages/projects/data';
import locales from '@/locales/pt-BR';
const { Panel } = Collapse;

export interface CardProjectsProps {
  projects: IProject[];
  colPros?: ColProps;
}

const CardProjects: React.FC<CardProjectsProps> = (props) => {

  const configureCardsProjects = (projects: IProject[]) => {
    return projects.map((p) => <>
      <Col xs={24} sm={24} md={24} lg={12} style={{ padding: '10px' }} {...props.colPros} >
        <Collapse
          bordered={false}
          style={{
            borderRadius: '5px',
            border: 'solid 2px black',
            backgroundColor: p.cardColor,
            padding: '10px',
          }} >
          {/* <Tooltip title={`${locales["layout.accessDash"]} ${p.name}`}> */}
            <div style={{ cursor: 'pointer' }} onClick={() => { alert("ABRIR O DASHBOARD") }}>
              <h2>{`${p.name} ${p.customer ? ` - ${p.customer}` : ''}`}</h2>
              {p.description ? <><p>{p.description}</p></> : <></>}
            </div>
          {/* </Tooltip> */}

          <Panel
            style={{
              border: 'solid 1px black',
              backgroundColor: colors.lightGreyRed,
              borderRadius: '5px'
            }}
            header={locales["layout.seeMore"]}
            key="1"
          >
            <div style={{ backgroundColor: colors.white, padding: '2px', borderRadius: '5px' }}>
              <p>{"SUBSTITUIR ESSE CONTEÚDO POR GRÁFICOS DOS CENÁRIOS- PLANEJAR DESENVOLVIMENTO"}</p>
            </div>
          </Panel>
        </Collapse>
      </Col>
    </>
    );
  }

  return (
    <>
      <Row
        justify={'space-between'}
        align={'top'}
        style={{
          padding: '20px',
        }}
      >
        {configureCardsProjects(props.projects)}
      </Row>
    </>
  );
};

export default CardProjects;
