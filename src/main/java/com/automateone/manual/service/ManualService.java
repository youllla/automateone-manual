package com.automateone.manual.service;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.automateone.manual.mapper.ManualMapper;
import com.automateone.manual.vo.ManualVO;


@Service
public class ManualService {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	ManualMapper manualMapper;
	
	//회원가입
	public int manualInsert(HttpServletRequest req, ManualVO mVO) throws Exception {
		String category = req.getParameter("category");
		String version_id = req.getParameter("version_id");
		String title = req.getParameter("title");
		String content = req.getParameter("content");
		String parse_content = req.getParameter("parse_content");
		
		if(version_id == "") {
			version_id = null;
		}
		
		mVO.setCategory(category);
		mVO.setVersionId(version_id);
		mVO.setTitle(title);
		mVO.setContent(content);
		mVO.setParse_content(parse_content);
		
		return manualMapper.manualInsert(mVO);
	}

	//매뉴얼 상세
	public int manualView(int category) throws Exception{
		return manualMapper.manualView(category);
	}
	
	
}
