package com.dh.catering.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
@Slf4j
public class S3ImageService {

    @Autowired
    private AmazonS3 amazonS3Client;

    @Value("${aws.s3.bucketName}")
    private String bucketName;


    public void uploadImage(String nombreDelArchivo, MultipartFile archivo){
        File fileObj = this.convertMultiPartFileToFile(archivo);
        amazonS3Client.putObject(new PutObjectRequest(bucketName,
                nombreDelArchivo,
                fileObj).withCannedAcl(CannedAccessControlList.PublicRead));
        fileObj.delete();
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }

    public String getUrlImage(String key){
        return String.valueOf(amazonS3Client.getUrl(bucketName, key));
    }
}
