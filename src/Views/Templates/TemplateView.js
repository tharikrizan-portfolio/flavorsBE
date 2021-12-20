import React, { useEffect, useState } from 'react';
import { Checkbox, Grid, Typography } from '@material-ui/core';
import { TabView } from '../components/TabView/TabView';
import ImgSheets from '../Dashboard/formTypeImages/Survey1.svg';
import ImgQuiz from '../Dashboard/formTypeImages/Quiz1.svg';
import '../../assets/css/custom.css';
import TemplateCard from './components/TemplateCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTemplates } from '../../actions/templateAction';
import CustomSelect from '../components/common/DropDown/CustomSelect';
import commonConstants from '../../util/common.constants';

const TemplateView = () => {
  const dispatch = useDispatch();
  const headers = useSelector((state) => state.userData.user.headers);
  const templateList = useSelector((state) => state.template.templateList.data || []);
  const [filteredTemplates, setFilteredTemplates] = useState({});
  const [filter, setFilter] = useState(commonConstants.TEMPLATE_FILTERS.ALL_TEMPLATE);

  useEffect(() => {
    if (templateList.length > 0) {
      const tempTemplates = [
        ...(filter === commonConstants.TEMPLATE_FILTERS.ALL_TEMPLATE
          ? templateList
          : filter === commonConstants.TEMPLATE_FILTERS.MY_TEMPLATE
          ? templateList.filter((x) => x.accountId != null)
          : filter === commonConstants.TEMPLATE_FILTERS.GLOBAL_TEMPLATE
          ? templateList.filter((x) => x.accountId == null)
          : []),
      ];
      setFilteredTemplates({
        surveyTemplates: [...tempTemplates.filter((x) => x.type == 'SURVEY')],
        quizTemplates: [...tempTemplates.filter((x) => x.type == 'QUIZ')],
      });
    }
  }, [filter]);

  useEffect(() => {
    dispatch(fetchTemplates(headers));
  }, []);

  useEffect(() => {
    setFilteredTemplates({
      surveyTemplates: [...(templateList && templateList.filter((x) => x.type == 'SURVEY'))],
      quizTemplates: [...(templateList && templateList.filter((x) => x.type == 'QUIZ'))],
    });
  }, [templateList]);

  const items = [
    {
      title: 'Survey',
      imgSrc: ImgSheets,
      content: RenderView(filteredTemplates?.surveyTemplates || []),
    },
    {
      title: 'Quiz',
      imgSrc: ImgQuiz,
      content: RenderView(filteredTemplates?.quizTemplates || []),
    },
  ];

  return (
    <div>
      <Typography variant={'h6'} gutterBottom>
        Templates
      </Typography>
      <TabView items={items}>
        <div style={{ width: '200px', padding: '10px' }}>
          <CustomSelect
            options={commonConstants.TEMPLATE_TYPES}
            value={commonConstants.TEMPLATE_TYPES.ALL_TEMPLATE}
            onChange={(e) => setFilter(e.value)}
          />
        </div>
      </TabView>
    </div>
  );
};

export default TemplateView;

const RenderView = (items) => (
  <Grid container spacing={1}>
    {items.map((item, i) => (
      <TemplateCard template={item} />
    ))}
  </Grid>
);
