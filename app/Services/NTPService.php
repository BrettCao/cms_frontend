<?php


namespace BaseCms\Services;


use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;

class NTPService
{
    public static function test($type,$text = null)
    {
        $response = [];
        if($type == 1){
            $response = self::journal_list($text);
        }elseif($type == 2){
            $response = self::journal_type_list();
        }elseif($type == 3){
            $response = self::show($text);
        }elseif($type == 4){
            $response = self::choose($text);
        }elseif($type == 5){
            $response = self::journal_search($text);
        }elseif($type == 6){
            $response = self::journal_hot($text);
        }elseif($type == 7){
            $response = self::search_journal($text);
        }
        return self::decodeBody($response);
    }

    protected static function journal_list($text) : ResponseInterface
    {
        $client = new Client();
        $response = $client->request('GET', 'http://www.exueshu.com/base/journal_list?type='.$text.'&num=12');
        return $response;
    }

    protected static function journal_type_list() : ResponseInterface
    {
        $client = new Client();
        $response = $client->request('GET', 'http://www.exueshu.com/base/journal_type_list');
        return $response;
    }

    protected static function show($text) : ResponseInterface
    {
        $client = new Client();
        $response = $client->request('GET', 'http://www.exueshu.com/base/show/'.$text);
        return $response;
    }

    protected static function choose($text) : ResponseInterface
    {
        $client = new Client();
        $response = $client->request('GET', 'http://www.exueshu.com/base/choose?page='.$text['page'].'&search_menu='.$text['search_menu']
            .'&value='.$text['value'].'&category_one='.$text['category_one'].'&journal_type='.$text['journal_type'].'&publish_area_id='.$text['publish_area_id'].'&publish_date='.$text['publish_date'].'&publish_cycle='.$text['publish_cycle'].'&is_included='.$text['is_included'].'&num='.$text['num'].'&type=1'.'&sort='.$text['sort']
        );
        return $response;
    }

    protected static function journal_search($text) : ResponseInterface
    {
        $client = new Client();
        $response = $client->request('GET', 'http://www.exueshu.com/base/journal_search?name='.$text);
        return $response;
    }

    protected static function journal_hot($text) : ResponseInterface
    {
        $client = new Client();
        $response = $client->request('GET', 'http://www.exueshu.com/base/journal_hot?uuid='.$text);
        return $response;
    }

    protected static function search_journal($text) : ResponseInterface
    {
        $client = new Client();
        $response = $client->request('GET', 'http://www.exueshu.com/base/search_journal?page='.$text['page'].'&name='.$text['name']);
        return $response;
    }

    protected static function decodeBody(ResponseInterface $response)
    {
        $body = $response->getBody();

        $stringBody = (string) $body;

        return \GuzzleHttp\json_decode($stringBody);
    }


}
