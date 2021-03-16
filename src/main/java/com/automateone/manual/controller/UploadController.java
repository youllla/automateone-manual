package com.automateone.manual.controller;

import java.io.File;
import java.util.Iterator;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
public class UploadController {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	
	@Value("${upload.path}")
	private String uploadPath;
	
	
	@RequestMapping("/imgUpload")
	public @ResponseBody String imgUpload(MultipartHttpServletRequest files) throws Exception {

		Iterator<String> itr =  files.getFileNames();
        String filePath = uploadPath;
        String originalFilename = "";

        //파일 있는 만큼
        while (itr.hasNext()) {
            
            MultipartFile mpf = files.getFile(itr.next());
     
            originalFilename = mpf.getOriginalFilename();
     
            String fileFullPath = filePath+"/"+originalFilename;
     
            try {
                //파일 저장
                mpf.transferTo(new File(fileFullPath)); //파일저장 실제로는 service에서 처리
                
                log.info("originalFilename : "+originalFilename);
                log.info("fileFullPath : "+fileFullPath);

            } catch (Exception e) {
                log.info("ERROR !!!!!!!!! "+fileFullPath);
                e.printStackTrace();
                
            }
       }
        return originalFilename;
	}

}
