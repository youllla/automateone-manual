package com.automateone.manual.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.automateone.manual.vo.ManualVO;

@Mapper
public interface ManualMapper {

	//매뉴얼 등록
	public int manualInsert(ManualVO mVO) throws Exception;
	
	//매뉴얼 상세
	public int manualView(int category) throws Exception;

	

}
