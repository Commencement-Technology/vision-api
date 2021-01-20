import React from 'react';
import renderer from "react-test-renderer";
import {createBrowserHistory} from "history";

import {PopularUsers} from './index';

import {globalInstance, allOver} from "../../helper/test-helper";

jest.mock("../../api/private", () => ({
    getPopularUsers: (duration: string) =>
        new Promise((resolve) => {
            resolve([
                {"name": "foo", "full_name": "Foo", "about": "Lorem ipsum dolor sit amet", "reputation": 70.44},
                {"name": "bar", "full_name": "Bar", "about": "Lorem ipsum dolor sit amet", "reputation": 72.44},
                {"name": "baz", "full_name": "Baz", "about": "Lorem ipsum dolor sit amet", "reputation": 74.44},
            ]);
        }),
}));


it('(1) Render with data.', async () => {
    const props = {
        global: globalInstance,
        history: createBrowserHistory(),
        addAccount: () => {
        }
    };

    const component = renderer.create(<PopularUsers {...props}/>);
    await allOver();
    expect(component.toJSON()).toMatchSnapshot();
});
