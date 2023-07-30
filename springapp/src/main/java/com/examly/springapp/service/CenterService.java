package com.examly.springapp.service;

import com.examly.springapp.model.Center;

import java.util.List;

public interface CenterService {
    public Center addCenter(Center serviceCenter);

    public List<Center> viewCenter();

    public Center editCenter(Center serviceCenter, Long id);

    public Center deleteCenter(long id);

    public Center getCenter(long id);

}
