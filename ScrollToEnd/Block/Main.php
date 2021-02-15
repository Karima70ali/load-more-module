<?php
/*
* @category  Theme
* @package   Bestresponse
* @author    Best Response Media Developers <dev@bestresponsemedia.co.uk>
* @copyright 2018 Best Response Media (http://bestresponsemedia.co.uk/)
* @license   Best Response Media Licence http://bestresponsemedia.co.uk/license/
* @link      http://bestresponsemedia.co.uk/
* ┌─┐┌─┐┌─┐┌┬┐ ┬─┐┌─┐┌─┐┌─┐┌─┐┌┐┬┌─┐┌─┐ ┌┐┌┐┌─┐┌─┐┬┌─┐
* │─│├┤ └─┐ │  ├┬┘├┤ └─┐├─┘│ ││││└─┐├┤  ││││├┤ │ │││─│
* └─┘└─┘└─┘ ┴  ┴└─└─┘└─┘┴  └─┘┴└┘└─┘└─┘ ┴└┘┴└─┘└─┘┴┴ ┴
*/

namespace BestResponseMedia\ScrollToEnd\Block;

class Main extends \Magento\Framework\View\Element\Template
{

    private $scopeConfig;
    private $catalogSession;
    private $registry;

    /**
     * Init constructor.
     * @param \Magento\Framework\View\Element\Template\Context $context
     * @param \Magento\Framework\UrlInterface $urlInterface
     * @param array $data
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Framework\UrlInterface $urlInterface,
        array $data = []
    ) {
        $this->scopeConfig = $context->getScopeConfig();
        $this->_urlInterface = $urlInterface;
        parent::__construct($context, $data);
    }
    /**
     * @param $fullPath
     * @return mixed
     */
    public function getConfig($fullPath)
    {
        return $this->scopeConfig->getValue($fullPath, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);
    }
    /**
     * @return mixed
     */
    public function getParams()
    {
        return $this->getRequest()->getParams();
    }
    /**
     * @return mixed
     */
    public function getCurrentUrl()
    {
        return explode("?",$this->_urlInterface->getCurrentUrl())[0];
    }
}
